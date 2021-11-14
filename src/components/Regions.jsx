import { Checkbox, IconButton } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

const Regions = ({ data, sport, games, checked, indeterminate, onChampCheck, onRegionCheck, onSportCheck }) => {
    const [openRegions, setOpenRegions] = useState({});

    const regions = useMemo(() => data && Object.values(data), [data]);

    const toggleRegionStatus = id => {
        openRegions[id] = !openRegions[id];

        setOpenRegions({ ...openRegions });
    };

    return (
        <>
            <div className="box region-wrap">
                <div className="header">
                    <span>{sport}</span>
                    <div className="end">
                        <Checkbox
                            color="error"
                            indeterminate={indeterminate}
                            checked={checked}
                            onChange={(e) => onSportCheck(e.target.checked)}
                        />
                        <span className="count">{games}</span>
                    </div>
                </div>
                <div className="list">
                    {regions.map(region => (
                        <div key={region.ID} className="item">
                            <div className="head">
                                <div>
                                    <span country={region.KeyName.toLowerCase()} className="flag"></span>
                                    {region.Name}
                                </div>
                                <div className="action">
                                    <Checkbox
                                        className="checkbox"
                                        color="error"
                                        indeterminate={region.indeterminate}
                                        checked={region.checked}
                                        onChange={(e) => onRegionCheck(region.ID, e.target.checked)}
                                    />
                                    <IconButton
                                        className="drop-icon"
                                        onClick={() => toggleRegionStatus(region.ID)}
                                        children={openRegions[region.ID] ? <ArrowDropUp /> : <ArrowDropDown />}
                                    />
                                </div>
                            </div>
                            <div className="chams">
                                {openRegions[region.ID] && Object.values(region.Champs).map(champ => (
                                    <div key={champ.ID} className="item">
                                        {champ.Name}
                                        <Checkbox checked={champ.checked} color="error" onChange={(e) => onChampCheck(region.ID, champ.ID, e.target.checked)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Regions;