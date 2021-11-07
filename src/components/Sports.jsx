import React, { useMemo } from 'react';
import { getClassName } from '../helpers';

const Sports = ({ data, toggleSport, activeSports }) => {
    const list = useMemo(() => data && Object.values(data), [data]);

    return (
        <div className="box sport-wrap">
            <div className="header">
                <span>All Games</span>
                <span>2328</span>
            </div>
            <div className="list">
                {list.map(item => (
                    <div className={getClassName({ item: true, active: activeSports[item.ID] })} onClick={() => toggleSport(item)} key={item.ID}>
                        <span>{item.Name}</span>
                        <span>{item.TotalGames}</span>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Sports;