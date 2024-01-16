import React from 'react'
const Legend = () => {
    return (
        <>

                <div className="legend">
                    <div className="item-heading">
                        <p>Drought Category (based on SPEI)</p>
                    </div>
                    <div className="legend-item">
                        <p className="legend-color-value"> Exceptional</p>
                        <p className="legend-color-value"> Extreme</p>
                        <p className="legend-color-value"> Severe</p>
                        <p className="legend-color-value"> Moderate</p>
                        <p className="legend-color-value"> Abnormal</p>
                        <p className="legend-color-value"> Normal</p>
                    </div>
                    <div className="legend-color">
                        <i style={{backgroundColor: 'brown'}}></i>
                        <i style={{backgroundColor: 'red'}}></i>
                        <i style={{backgroundColor: 'orange'}}></i>
                        <i style={{backgroundColor: 'rgb(252, 214, 148)'}}></i>
                        <i style={{backgroundColor: 'yellow'}}></i>
                        <i style={{backgroundColor: 'white'}}></i>
                    </div>

                    <div className="legend-item">
                        <p className="legend-num-value"> -3.0</p>
                        <p className="legend-num-value"> -2.0</p>
                        <p className="legend-num-value"> -1.6</p>
                        <p className="legend-num-value"> -1.3</p>
                        <p className="legend-num-value"> -0.8</p>
                        <p className="legend-num-value"> -0.5</p>
                    </div>

                </div>

        </>

    )
}

export default Legend