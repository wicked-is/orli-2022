import styled from "styled-components"

import TitleBar from "./TitleBar"

export default function TheLocalWay(props) {
    const { title, iframe, columns } = props
    return (
        <section>
            <TitleBar title="" />
            { iframe }
            <div>
                {
                    columns.map((column, index) => {
                        return (
                            <div key={index}>
                                {`column ${ index }`}
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}