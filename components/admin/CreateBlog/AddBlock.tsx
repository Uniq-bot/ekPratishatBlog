import React from "react";

const AddBlock = ({ setBlocks, blockType, setBlockType, setLevel, setSetLevel, content, setContent }: { setBlocks: React.Dispatch<React.SetStateAction<any>> }) => {
  
  const headingLevels = [1, 2, 3, 4, 5];
  

  const handleAddBlock=()=>{
    const newBlock={
        id: Date.now(),
        type: blockType,
        ...(blockType === "heading" && { level: setLevel }),
        content: blockType === "list" ? content.split("\n") : content,
    }

    setBlocks((prev: any[]) => [...prev, newBlock])
     setBlockType("heading")
  setSetLevel(1)
  setContent("")
  }
  return (
    <div className="w-full py-5 border bg-[#EBECD8]/50 h-100">
      <h1 className="text-md border-r border border-l-0 bg-[#DBDBB8] w-fit  px-10 py-2">
        Add Block
      </h1>
      <div className="px-5 mt-2">
        <div>
          <label>Block Type</label>
          <select
            value={blockType}
            onChange={(e) => setBlockType(e.target.value)}
            className="w-full border h-10 outline-none text-md ml-2 mt-1"
          >
            <option value="paragraph">Paragraph</option>
            <option value="heading">Heading</option>
            <option value="image">Image</option>
            <option value="list">List</option>
          </select>
        </div>
        {blockType === "heading" && (
          <div className="w-full flex flex-wrap flex-col gap-2 mt-2">
            <label>Block Type</label>
            <div className="flex flex-wrap gap-2 ml-2">
              {headingLevels.map((level) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSetLevel(level);
                  }}
                  className={`bg-[#DBDBB8]/60 border ${setLevel === level ? "bg-[#d0d05d]" : ""} hover:bg-[#CFCFC0] hover:cursor-pointer py-1 px-3`}
                  key={level}
                >
                  H{level}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="w-full flex flex-col gap-2 mt-5">
          <p>Content</p>
          {blockType === "paragraph" ? (
            <textarea
              className="w-full  focus:border-b transition-all h-20 outline-none p-2"
              placeholder="Paragraph content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          ) : blockType === "heading" ? (
            <input
              className="w-full h-10 focus:border-b transition-all outline-none p-2"
              placeholder={`Heading ${setLevel} content...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : blockType === "image" ? (
            <input
              className="w-full h-10 outline-none p-2"
              placeholder="Image URL..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            blockType === "list" && (
              <textarea
                className="w-full h-20 outline-none p-2"
                placeholder={`List item 1\nList item 2\nList item 3`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            )
          )}
        </div>
        <button 
          className="px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer bg-white border shadow shadow-black mt-5"
          onClick={handleAddBlock}
         >
          Add Block
        </button>
      </div>
    </div>
  );
};

export default AddBlock;
