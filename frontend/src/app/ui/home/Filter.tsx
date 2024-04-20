'use client';
import { useState } from "react";

export default function Filter({ onSetFilter }: { onSetFilter: Function }) {
    const [filters, setFilters] = useState(new Array<string>());

    function updateFilters(event: any) {
        if (event.target.checked) {
            const updatedFilters = [...filters, event.target.value];
            setFilters(updatedFilters);
            onSetFilter(updatedFilters);
        }
        else {
            const updatedFilters = filters.filter((filter: string) => filter !== event.target.value);
            setFilters(updatedFilters);
            onSetFilter(updatedFilters);
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="laptops">Laptops</label>
                <input type="checkbox" name="laptops" value="Laptops" onChange={updateFilters} />
            </div>
            <div>
                <label htmlFor="calculators">Calculators</label>
                <input type="checkbox" name="calculators" value="Calculators" onChange={updateFilters} />
            </div>
            <div>
                <label htmlFor="headsets">Headsets</label>
                <input type="checkbox" name="headsets" value="Headsets" onChange={updateFilters} />
            </div>
            <div>
                <label htmlFor="chargers">Chargers</label>
                <input type="checkbox" name="chargers" value="Chargers" onChange={updateFilters} />
            </div>
            <div>
                <label htmlFor="mice">Mice</label>
                <input type="checkbox" name="mice" value="Mice" onChange={updateFilters} />
            </div>
            <div>
                {filters.map((filter) => <h1 key={filter}>{filter}</h1>)}
            </div>
        </div>
    );
}