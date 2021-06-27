import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        return (
            <div>
                {/*You can remove this line and the line below. */}
                <table className="table table-bordered">
                    <tbody>
                        { this.props.emotions ? 
                            (Object.entries(this.props.emotions).map(function (mapentry) {
                                return (
                                    <tr>
                                        <td>{mapentry[0]}</td>
                                        <td>{mapentry[1]}</td>
                                    </tr>
                                )
                            })) : (
                                <h3>Empty response received</h3>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}
export default EmotionTable;
