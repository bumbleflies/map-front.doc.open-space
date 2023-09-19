import {useState} from "react";

export const useSelectionMenu = () => {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [selected, setSelected] = useState<null | string>(null)


    function openMenu(event: React.MouseEvent<HTMLElement>, selectionIdentifier: string) {
        setMenuAnchorEl(event.currentTarget);
        setSelected(selectionIdentifier)
    }

    const closeMenu = () => {
        setMenuAnchorEl(null);
        setSelected(null)
    }

    return {
        selected: selected,
        menu: {
            open: openMenu,
            close: closeMenu,
            anchor: menuAnchorEl
        }
    }
}