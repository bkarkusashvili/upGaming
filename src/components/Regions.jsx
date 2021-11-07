import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useMemo, useState } from 'react';

const Regions = ({ data, sport, games }) => {
    const [region, setRegion] = useState();

    const regions = useMemo(() => data && Object.values(data), [data]);
    const champs = useMemo(() => region && data[region]?.Champs && Object.values(data[region].Champs), [data, region]);

    const toggleSport = (e) => {
        data.checked = e.target.checked;
    };

    return (
        <>
            <div className="box region-wrap">
                <div className="header">
                    <span>{sport}</span>
                    <div className="end">
                        <span>{games}</span>
                        <Checkbox color="error" checked={data.checked} onChange={toggleSport} />
                    </div>
                </div>
                <div className="list">
                    {regions.map(item => (
                        <>
                            <div key={item.ID} className="item" onClick={() => setRegion(item.ID)}>
                                {item.Name}
                                <FormControlLabel
                                    label="Parent"
                                    control={
                                        <Checkbox
                                            checked={true && false}
                                            indeterminate={true}
                                            onChange={(e) => console.log(e)}
                                        />
                                    }
                                />
                            </div>
                            <div className="chams">
                                {champs && champs.map(item => (
                                    <div>
                                        {item.Name}

                                        <FormControlLabel
                                            label="Child 1"
                                            control={<Checkbox checked={false} onChange={(e) => console.log(e)} />}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Regions;