import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CircularProgress from "../../components/circular-progress";
import Modal from "../../components/modal";
import { Prediction } from "./types";

type PredictionProps = {
  prediction: Prediction | undefined;
};

export default function PredictionResult({ prediction }: PredictionProps) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!prediction?.survived) {
      setShowModal(true);
    }
  }, [prediction]);

  if (!prediction) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <CircularProgress value={prediction.accuracy * 100} />
        <span className="text-9xl">{prediction.survived ? "😃" : "💀"}</span>
      </div>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        color="error"
      >
        Sorry man, you didn't survived!
      </Modal>
    </>
  );
}
