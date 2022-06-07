// import styles from '../styles/hero.module.css'
import styled from 'styled-components'

const SubNavContainer = styled.ul`
    width: 100%;
    background: var(--lt-grey);
    padding: 1rem 0rem 0rem;
    margin: 0;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    list-style: none;

    p {
        font-family: 'GT Walsheim'; 
        font-weight: 300;

        &:hover {
            font-family: 'GT Walsheim'; 
            font-weight: 700;
        }
    }

    li {
        position: relative; 
        margin: auto 2rem; 
        cursor: pointer; 
        transition: 0.3s ease all;
    }

    img {
        height: 85px;
        width: auto;
    }

    .iconNav {
        width: 100%; 
        
        max-width: 4rem;
        margin: auto; 
        text-align: center; 
        display: block;
    }
`

export default function AnchorBar(props) {

    const { anchorNavigation } = props

    return (
        <SubNavContainer>               
            {   
                anchorNavigation.map((item, index) => {
                    return (
                        <li key={`ni-${index}`} >
                            <a href={item.anchor}>
                            <img src={item.icon !== null ? item.icon.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className="iconnav" alt={item.iconnav?.altText} />
                            <p className="black xs-copy uppercase center">{item.text}</p>
                            </a>
                        </li>
                        )
                })
            }
        </SubNavContainer>
    )
}