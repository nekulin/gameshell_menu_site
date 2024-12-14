import { motion } from "framer-motion";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import useCartStore from "@/store/cartStore";


const DraggableDrawer = () => {

    const {cartSwitches, setDraggableDrawer, draggableDrawer} = useCartStore(state => state);

    const handleClose = () => {
        setDraggableDrawer(false);
    };
    
      const handleOpen = () => {
        setDraggableDrawer(true);
    };


    return (
        <>
            {/* Затенение экрана */}
            <Backdrop
                open={draggableDrawer}
                onClick={handleClose}
                sx={{
                zIndex: 1200, // должен быть выше, чем у Drawer
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            />

            {/* Выезжающий блок */}
            <SwipeableDrawer
                anchor="bottom"
                open={draggableDrawer}
                onClose={handleClose}
                onOpen={handleOpen}
                swipeAreaWidth={40}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                "& .MuiDrawer-paper": {
                    height: "50vh",
                    padding: "20px",
                    borderRadius: "10px 10px 0 0",
                    background: "#ffe0e0",
                },
                }}
            >
                {
                    cartSwitches.paymentSwitch
                                                ?
                    <Box
                        sx={{
                            height: "100%",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "28px",
                                fontWeight: 700,
                            }}
                        >
                            Оплата
                        </h1>
                    </Box>
                                                :
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            rowGap: "10px",
                            height: "100%",
                        }}
                    >
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            }}
                            style={{
                            fontSize: "28px",
                            fontWeight: 700,
                            }}
                        >
                            SOTTO
                        </motion.h1>
                        <p
                            style={{
                                fontSize: "18px",
                                fontWeight: 300,
                            }}
                        >
                            Официант оформляет ваш заказ!
                        </p>
                    </Box>
                }
            </SwipeableDrawer>
        </>
  )
}


export default DraggableDrawer;