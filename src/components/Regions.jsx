import { Checkbox, IconButton } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

const Regions = ({ data, sport, games, checked }) => {
    const [openRegions, setOpenRegions] = useState({});
    const [region, setRegion] = useState();

    const regions = useMemo(() => data && Object.values(data), [data]);

    const toggleSport = e => data.checked = e.target.checked;
    const toggleRegionStatus = id => {
        openRegions[id] = !openRegions[id]

        setOpenRegions({ ...openRegions });
    };

    return (
        <>
            <div className="box region-wrap">
                <div className="header">
                    <span>{sport}</span>
                    <div className="end">
                        <Checkbox color="error" indeterminate={false} checked={checked} onChange={toggleSport} />
                        <span className="count">{games}</span>
                    </div>
                </div>
                <div className="list">
                    {regions.map(item => (
                        <>
                            <div key={item.ID} className="item" onClick={() => setRegion(item.ID)}>
                                <div className="head">
                                    <div>
                                        <span country={item.KeyName.toLowerCase()} className="flag"></span>
                                        {item.Name}
                                    </div>
                                    <div className="action">
                                        <Checkbox className="checkbox" color="error" indeterminate={false} checked={data.checked} onChange={toggleSport} />
                                        <IconButton
                                            className="drop-icon"
                                            onClick={() => toggleRegionStatus(item.ID)}
                                            children={openRegions[item.ID] ? <ArrowDropUp /> : <ArrowDropDown />}
                                        />
                                    </div>
                                </div>
                                <div className="chams">
                                    {openRegions[item.ID] && Object.values(item.Champs).map(item => (
                                        <div className="item">
                                            {item.Name}
                                            <Checkbox checked={false} color="error" onChange={(e) => console.log(e)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Regions;