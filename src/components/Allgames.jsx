import React, { useEffect, useState } from 'react';

const Allgames = () => {

    const [data, setData] = useState()
    const [sport, setSport] = useState()

    useEffect(() => {
        fetch('https://sportservice.inplaynet.tech/api/sport/getheader/en')
            .then(response => response.json())
            .then((SportData) => {
                setData(JSON.parse(SportData).EN.Sports)
            })
            .catch(() => {
                console.log('error');
            })

    }, []);

    console.log(data);
    return (
        <>
            <div>
                {data && Object.values(data).map(el => (
                    <div onClick={() => setSport(el.ID)} key={el.ID}> {el.Name}</div>
                ))}
            </div>
            <hr />
            {data && sport && data[sport] && (
                <div>
                    <span>
                        {data[sport].Name}
                    </span>
                    <div>
                        {Object.values(data[sport].Regions).map(el => (
                            <div>
                                {el.Name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Allgames;