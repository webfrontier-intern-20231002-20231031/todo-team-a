import { use, useEffect, useState } from "react";

type SortProps = {
   sortNum: number
   onTabIndexChange: (newTabIndex: number) => void
}

const Sort = ({sortNum, onTabIndexChange}: SortProps) => {

    const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const val = parseInt(event.target.value);
        onTabIndexChange(val);
    }

    return (
    <div className="form-control  max-w-xs mr-5">
            <select className="select select-info select-xs max-w-xs" onChange={handleValueChange} value={sortNum}>
            {/* <option disabled value={0}>Sort</option> */}
            <option value={1} selected>作成順</option>
            <option value={2}>更新順</option>
        </select>
    </div>
    )
}

export default Sort;