"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, AlertTriangle } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";

interface FavoritesImportModalProps {
    isOpen:      boolean;
    onClose:     () => void;
    prefillJson?: string;   // for ?import= URL param
}

export function FavoritesImportModal({ isOpen, onClose, prefillJson }: FavoritesImportModalProps) {
    const { importFromJSON, favorites } = useFavoritesStore();
    const [json, setJson]         = useState(prefillJson ?? "");
    const [mode, setMode]         = useState<"merge" | "replace">("merge");
    const [preview, setPreview]   = useState<{ count: number; cols: number } | null>(null);
    const [error, setError]       = useState("");
    const [success, setSuccess]   = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const validateJson = (raw: string) => {
        try {
            const data = JSON.parse(raw);
            if (!data.favorites || !Array.isArray(data.favorites)) throw new Error();
            setPreview({ count: data.favorites.length, cols: (data.collections ?? []).filter((c: { isDefault: boolean }) => !c.isDefault).length });
            setError("");
        } catch {
            setPreview(null);
            setError("JSON inválido o formato incorrecto");
        }
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (r) => {
            const raw = r.target?.result as string ?? "";
            setJson(raw);
            validateJson(raw);
        };
        reader.readAsText(file);
    };

    const handleTextChange = (v: string) => {
        setJson(v);
        if (v.trim()) validateJson(v);
        else { setPreview(null); setError(""); }
    };

    const handleImport = () => {
        const result = importFromJSON(json, mode);
        if (result.success) {
            setSuccess(true);
            setTimeout(() => { setSuccess(false); onClose(); }, 1500);
        } else {
            setError(result.error ?? "Error desconocido");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div className="fixed inset-0 bg-black/50 z-50"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose} />
                    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div
                            className="bg-white border-2 border-[#111111] w-full max-w-md pointer-events-auto"
                            style={{ boxShadow: "6px 6px 0 #111111" }}
                            initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }}
                        >
                            <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-[#111111] bg-[#111111]">
                                <span className="font-press-start text-[10px] text-white">IMPORTAR</span>
                                <button onClick={onClose} className="text-[#888888] hover:text-white"><X size={14} /></button>
                            </div>

                            <div className="p-5 space-y-4">
                                {/* File drop zone */}
                                <div
                                    className="border-2 border-dashed border-[#DDDDDD] p-5 text-center cursor-pointer hover:border-[#CC0000] transition-colors"
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <Upload size={24} className="text-[#CCCCCC] mx-auto mb-2" />
                                    <p className="font-press-start text-[8px] text-[#888888]">Arrastra un archivo .json</p>
                                    <p className="font-nunito text-[11px] text-[#AAAAAA] mt-1">o haz click para seleccionar</p>
                                    <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleFile} />
                                </div>

                                {/* Paste JSON */}
                                <div>
                                    <label className="font-press-start text-[8px] text-[#888888] block mb-1.5">O PEGA EL JSON</label>
                                    <textarea
                                        value={json}
                                        onChange={(e) => handleTextChange(e.target.value)}
                                        placeholder='{"version":1,"favorites":[...],"collections":[...]}'
                                        rows={3}
                                        className="w-full font-jetbrains text-[10px] px-3 py-2 border-2 border-[#DDDDDD] focus:border-[#CC0000] outline-none resize-none bg-[#FAFAFA]"
                                    />
                                </div>

                                {/* Preview */}
                                {preview && (
                                    <div className="bg-[#F9F9F9] border border-[#E5E5E5] p-3">
                                        <p className="font-nunito text-[13px] text-[#555555]">
                                            Se importarán <strong>{preview.count}</strong> favoritos en <strong>{preview.cols}</strong> colecciones
                                        </p>
                                        <p className="font-nunito text-[11px] text-[#AAAAAA] mt-0.5">
                                            Tienes actualmente {favorites.length} favoritos
                                        </p>
                                    </div>
                                )}

                                {/* Mode */}
                                <div className="flex gap-3">
                                    {(["merge", "replace"] as const).map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setMode(m)}
                                            className="flex-1 py-2 border-2 font-press-start text-[7px] transition-colors"
                                            style={{
                                                borderColor:     mode === m ? "#CC0000" : "#DDDDDD",
                                                backgroundColor: mode === m ? "#CC000010" : "white",
                                                color:           mode === m ? "#CC0000" : "#888888",
                                            }}
                                        >
                                            {m === "merge" ? "Combinar" : "Reemplazar"}
                                        </button>
                                    ))}
                                </div>
                                {mode === "replace" && (
                                    <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 p-2.5">
                                        <AlertTriangle size={13} className="text-amber-500 shrink-0" />
                                        <p className="font-nunito text-[11px] text-amber-700">Esto eliminará todos tus favoritos actuales</p>
                                    </div>
                                )}

                                {error && <p className="font-nunito text-[12px] text-[#CC0000]">{error}</p>}
                                {success && <p className="font-nunito text-[12px] text-green-500">¡Importación exitosa! ✓</p>}

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-1">
                                    <button onClick={onClose} className="font-press-start text-[8px] px-4 py-2 border-2 border-[#DDDDDD] text-[#888888]">Cancelar</button>
                                    <motion.button
                                        onClick={handleImport}
                                        disabled={!preview || !!error}
                                        className="font-press-start text-[8px] px-4 py-2 bg-[#CC0000] text-white border-2 border-[#CC0000] disabled:opacity-40"
                                        style={{ boxShadow: "3px 3px 0 #111111" }}
                                        whileHover={{ x: 1, y: 1, boxShadow: "2px 2px 0 #111111" }}
                                    >
                                        Importar
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
