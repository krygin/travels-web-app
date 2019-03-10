import React, {Component} from 'react'
import {Cell} from "@vkontakte/vkui";
import {Group} from "@vkontakte/vkui";


class JourneyCell extends Component {
    render() {
        return <Group>
            <Cell
                size={"l"}
                expandable={true}
                bottomContent={
                    <div style={{display: `table`}}>
                        <div style={{display: `table-row`}}>
                            <img style={{maxHeight: `100%`, maxWidth: `100%`}}
                                 src="https://cdn.civitatis.com/italia/verona/galeria/verona-vista-aerea.jpg"/><br/>
                        </div>
                        <div style={{display: `table-row`}}>
                            <h1 style={{display: `table-cell`}}>Франция (28 апреля - 5 мая)</h1>
                        </div>
                        <div style={{display: `table-row`}}>
                            <h4 style={{display: `table-cell`}}>40000 руб.</h4>
                            <h4 style={{display: `table-cell`}}>8 человек</h4>
                        </div>
                    </div>
                }/>
        </Group>
    }
}

export default JourneyCell;