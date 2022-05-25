import styled from "styled-components"

import TitleBar from "./TitleBar"

const TheLocalWayContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 6rem 10%;
    background-color: var(--lt-grey);
`

const ColumnsContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.6rem;

    padding-top: 5rem;

    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 676px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 425px) {
        grid-template-columns: 1fr;
    }
`

const Column = styled.div``

const ListContainer = styled.p`
    line-height: 32px;
    font-size: var(--body-copy);
    font-family: 'GT Walsheim Light';
    line-height: 150%;
`

const ColumnSection = styled.div`
    margin-bottom: 2rem;
`

export default function TheLocalWay(props) {
    const { title, iframe, columns } = props
    return (
        <TheLocalWayContainer>
            <TitleBar title="The Local Way" left="true" />
            <div dangerouslySetInnerHTML={{ __html: iframe }} ></div>
            <ColumnsContainer>
                {
                    columns.map((column, index) => {
                        return (
                            <Column key={index}>
                                {
                                    column.sections.map((section, index) => {
                                        return (
                                            <ColumnSection key={index}>
                                                <h2 class="sans-serif sub-heading-bold black">{section.title}</h2>
                                                <ListContainer dangerouslySetInnerHTML={{ __html: section.list }}></ListContainer>
                                            </ColumnSection>
                                        )
                                    })
                                }
                            </Column>
                        )
                    })
                }
            </ColumnsContainer>
        </TheLocalWayContainer>
    )
}