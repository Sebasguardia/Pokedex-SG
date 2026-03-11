"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Used to wrap each page for smooth page transitions
const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" as const } },
};

interface PageTransitionProps {
    children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
        >
            <motion.div
                key={pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
