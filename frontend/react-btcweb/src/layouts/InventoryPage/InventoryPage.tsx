import { Box } from "@mui/material";
import {useAuth} from "../../hooks/useAuth";
import { Header } from "../utils/Header";

export const InventoryPage = () => {
    return (
        <Box p={3}>
            <Header title='Inventário' subtitle='Vizualização do inventário'/>
        </Box>
    );
}