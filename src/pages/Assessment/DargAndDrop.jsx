import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";




// Draggable item component
const DragItem = ({ option }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "ITEM",
        item: { option },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className="input-values"
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {option}
        </div>
    );
};


// Input box component
const InputBox = ({ value, index, onDrop }) => {
    const [, drop] = useDrop({
        accept: "ITEM",
        drop: (item) => onDrop(index, item.option),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });
    return (
        <div className="d-flex align-items-center gap-2">
            <div>
                <span className="input-count">{index + 1}</span>
            </div>
            <div
                ref={drop}
                className="input-drag-field"
                style={{
                    background: value ? "#f9f9f9" : "#fff",
                }}
            >
                {value || "Drop here"}
            </div>
        </div>
    );
};



const DragAndDrop = ({ data, onDataChange }) => {

    const [question, setQuestion] = useState(data.question);
    const [inputValues, setInputValues] = useState([null, null, null, null]);
    const [options] = useState(data.options);
    const [answerStatus, setAnswerStatus] = useState(false);
    // Handle the drop logic
    const handleDrop = (index, value) => {
        setInputValues((prev) => {
            const newValues = [...prev];
            newValues[index] = value;
            checkOrder(newValues);
            return newValues;
        });
    };

    useEffect(() =>{
        onDataChange(data.id,answerStatus)
    },[answerStatus]);

    // Handle the answer check
    const checkOrder = (updatedValues) => {
        const correctOrder = data.correctAnswer;     

        const filteredInputValues = updatedValues.filter((val) => val !== null);      

        // Check if the filtered input matches the correct order
        const isCorrect = JSON.stringify(filteredInputValues) === JSON.stringify(correctOrder);
        // console.log("Is Correct Order:", isCorrect);

        if (filteredInputValues.length < correctOrder.length ) {
            console.log("Please complete all the fields before checking!");
            setAnswerStatus(false);
        } else {
            console.log(isCorrect ? "Correct order!" : "Incorrect order. Try again!");
            setAnswerStatus(isCorrect);
        }
    };

    const resetInputs = () => {
        setInputValues([null, null, null, null]);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-4">
                {/* <h5 className="mb-3">{question}</h5> */}
                <div className="drag-down-drop row">

                    <div className="col-md-6">
                        {options.map((option, index) => (
                            <DragItem key={index} option={option} />
                        ))}
                    </div>
                    <div className="col-md-6">
                        {inputValues.map((value, index) => (
                            <InputBox
                                key={index}
                                value={value}
                                index={index}
                                onDrop={handleDrop}
                            />
                        ))}
                    </div>
                </div>
                {/* Buttons for checking and resetting */}
                <div className="mt-3 d-flex justify-content-end">
                    {/* <button onClick={checkOrder} className="btn btn-primary me-2">
                        Check Answer
                    </button> */}
                    <button onClick={resetInputs} className="btn btn-secondary ">
                        Reset
                    </button>
                </div>
            </div>
        </DndProvider>
    );
};

export default DragAndDrop;
