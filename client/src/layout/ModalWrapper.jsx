import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: { y: "-100vh", opacity: 0, scale: 0.8 },
    visible: {
      y: "0",
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.2 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className={twMerge(
          "bg-foreground rounded-lg shadow-lg p-8 max-w-lg w-full"
        )}
        variants={modal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ModalWrapper;
