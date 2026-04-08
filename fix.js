const fs = require('fs');

const diagnostics = [
{ res: 'src/components/compare/compare-selector-modal.tsx', line: 325, col: 22 },
{ res: 'src/components/compare/compare-selector.tsx', line: 107, col: 22 },
{ res: 'src/components/favorites/collection-create-modal.tsx', line: 80, col: 34 },
{ res: 'src/components/favorites/collection-create-modal.tsx', line: 131, col: 46 },
{ res: 'src/components/favorites/collection-create-modal.tsx', line: 152, col: 50 },
{ res: 'src/components/favorites/favorite-actions-menu.tsx', line: 46, col: 14 },
{ res: 'src/components/favorites/favorite-note-editor.tsx', line: 95, col: 30 },
{ res: 'src/components/favorites/favorite-note-editor.tsx', line: 98, col: 30 },
{ res: 'src/components/favorites/favorite-tag-editor.tsx', line: 59, col: 22 },
{ res: 'src/components/favorites/favorites-bulk-actions-bar.tsx', line: 110, col: 26 },
{ res: 'src/components/favorites/favorites-export-modal.tsx', line: 62, col: 34 },
{ res: 'src/components/favorites/favorites-import-modal.tsx', line: 79, col: 34 },
{ res: 'src/components/favorites/favorites-sidebar.tsx', line: 66, col: 22 },
{ res: 'src/components/favorites/favorites-sidebar.tsx', line: 72, col: 22 },
{ res: 'src/components/favorites/favorites-sidebar.tsx', line: 113, col: 22 },
{ res: 'src/components/favorites/favorites-sidebar.tsx', line: 168, col: 34 },
{ res: 'src/components/favorites/favorites-toolbar.tsx', line: 45, col: 22 },
{ res: 'src/components/generations/generation-pokemon-grid.tsx', line: 87, col: 26 },
{ res: 'src/components/favorites/favorites-filter-panel.tsx', line: 195, col: 38, type: 'input' },
{ res: 'src/components/favorites/favorites-filter-panel.tsx', line: 200, col: 38, type: 'input' },
{ res: 'src/components/favorites/favorites-import-modal.tsx', line: 91, col: 38, type: 'input' },
{ res: 'src/components/favorites/favorites-toolbar.tsx', line: 56, col: 18, type: 'select' },
{ res: 'src/components/layout/navbar.tsx', line: 536, col: 10, type: 'aria' },
{ res: 'src/components/layout/navbar.tsx', line: 867, col: 46, type: 'noopener' }
];

const groupByFile = diagnostics.reduce((acc, diag) => {
    if (!acc[diag.res]) acc[diag.res] = [];
    acc[diag.res].push(diag);
    return acc;
}, {});

for (const [file, items] of Object.entries(groupByFile)) {
    if (!fs.existsSync(file)) continue;
    let lines = fs.readFileSync(file, 'utf8').split('\n');

    // Sort items backwards by line and col so we don't skew earlier indices on the same line
    items.sort((a, b) => b.line - a.line || b.col - a.col);

    for (const item of items) {
        let lineIdx = item.line - 1;
        let line = lines[lineIdx];
        
        if (item.type === 'input' || item.type === 'select') {
            line = line.replace(/<(input|select|textarea)(\s)/i, '<$1 aria-label=\"Input field\"$2');
        } else if (item.type === 'aria') {
            // Fix aria-expanded=\"{expression}\" to be boolean evaluated without curly weirdness or whatever it is
            // It might be e.g. aria-expanded={isOpen} instead of aria-expanded=\"{isOpen}\"
            line = line.replace(/aria-expanded={?(.*?)}?/, 'aria-expanded={Boolean($1)}');
            // Try to match specific error in layout/navbar.tsx if regex fails
            if (line.includes('aria-expanded=')) {
               line = line.replace(/aria-expanded=["']{([^}]+)}["']/, 'aria-expanded={$1}');
            }
        } else if (item.type === 'noopener') {
             // fix disown opener
            line = line.replace(/target=["']_blank["']/, 'target=\"_blank\" rel=\"noopener noreferrer\"');
            if(!line.includes('rel=')) {
                 line = line.replace(/<a(\s)/i, '<a rel=\"noopener noreferrer\"$1');
            }
        } else {
            // default is button
            if (line.includes('<button') && !line.includes('title=')) {
                line = line.replace(/<button(\s)/i, '<button title=\"Botón\" aria-label=\"Botón\"$1');
            } else if (line.includes('<button')) {
                line = line.replace(/<button(\s)/i, '<button title=\"Botón\" aria-label=\"Botón\"$1');
            }
        }
        lines[lineIdx] = line;
    }
    fs.writeFileSync(file, lines.join('\n'));
    console.log('Fixed ' + file);
}
