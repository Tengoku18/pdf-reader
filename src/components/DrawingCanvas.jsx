import { useEffect, useRef, useState, useContext } from "react";

import { ButtonContext } from "./SecondPage";

const DrawingCanvas = () => {
  const { annotation, setAnnotation, permission, setPermission } =
    useContext(ButtonContext);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  const canvasOffsetX = useRef(null);
  const canvasOffsetY = useRef(null);
  const startX = useRef(null);
  const startY = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = 740;
    canvas.width = 550;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.fillStyle = "red";

    context.lineWidth = 1;
    contextRef.current = context;

    const canvasOffset = canvas.getBoundingClientRect();
    canvasOffsetX.current = canvasOffset.left;
    canvasOffsetY.current = canvasOffset.top;
  }, []);
  useEffect(() => {
    const data = window.localStorage.getItem("co-ordinates");

    setAnnotation(JSON.parse(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isDrawing) {
      const titleObject = {
        x: startX.current,
        y: startY.current,
        type: permission.type,
      };
      setAnnotation((prevTitle) => [...prevTitle, titleObject]);
      window.localStorage.setItem(
        "co-ordinates",
        JSON.stringify([...annotation, titleObject])
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawing]);

  const StartDrawingRectangle = (positionEvent) => {
    positionEvent.preventDefault();
    positionEvent.stopPropagation();

    startX.current = positionEvent.clientX - canvasOffsetX.current;
    startY.current = positionEvent.clientY - canvasOffsetY.current;

    if (permission.granted === true) {
      setIsDrawing(true);
    }
  };
  const DrawRectangle = (positionEvent) => {
    if (!isDrawing) {
      return;
    }
    positionEvent.preventDefault();
    positionEvent.stopPropagation();

    const newMouseX = positionEvent.clientX - canvasOffsetX.current;
    const newMouseY = positionEvent.clientY - canvasOffsetY.current;
    const rectWidth = newMouseX - startX.current;
    const rectHeight = newMouseY - startY.current;

    contextRef.current.fillRect(
      startX.current,
      startY.current,
      rectWidth,
      rectHeight
    );
  };

  const StopDrawingRectangle = () => {
    setPermission((preState) => ({
      ...preState,
      granted: false,
    }));
    setIsDrawing(false);
  };

  return (
    <div>
      <div style={{ height: "740px", width: "550px" }} className=" relative  ">
        <canvas
          ref={canvasRef}
          onMouseDownCapture={StartDrawingRectangle}
          onMouseMove={DrawRectangle}
          onMouseUp={StopDrawingRectangle}
          onMouseLeave={StopDrawingRectangle}
          className="border-2 border-black absolute top-0 left-0 opacity-5   "
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;
