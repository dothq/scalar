export const Divide = ({ x, y, colour, px, py }: { x?: boolean, y?: boolean, colour?: any, px?: number, py?: number }) => (
    <div className={x ? `flex px-${px || 0} py-${py || 0} w-full` : `flex px-${px || 0} py-${py || 0} h-full`}>
        <hr className={x 
            ? `w-full h-px m-0 p-0 border-none bg-${colour || "void"} bg-opacity-10` 
            : `w-px h-full m-0 p-0 border-none bg-${colour || "void"} bg-opacity-10`} 
        />
    </div>
)