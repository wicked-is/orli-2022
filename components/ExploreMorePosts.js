import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const ExploreMorePostsMainContainer = styled.section`
    padding-top: 4rem;
    margin-bottom: 4rem;
`
const ExploreMorePostsInnerContainer = styled.div`
    max-width: 80%;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: 1050px) {
        max-width: 960px;
        padding: 0 2rem;
    }
`
const ExploreMorePostsTile = styled.div`
    flex: 1;
    cursor: pointer;

    @media screen and (max-width: 676px) {
        margin-bottom: 3rem;
    }
`
const ExploreMorePostsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
    
    @media screen and (max-width: 676px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

export default function ExploreMorePosts(props) {
    console.log(props);
    const { anchor, posts, title } = props
    return (
        <ExploreMorePostsMainContainer>
            <a name={anchor} id={anchor}></a>
            <ExploreMorePostsInnerContainer>
                <p className="heading left">{title}</p>
                <ExploreMorePostsGrid>
                    {
                        posts.map(post => {
                            return (
                                <ExploreMorePostsTile>
                                    <Link href={post.uri}><Image src={post.featuredImage.node.mediaItemUrl} alt={post.featuredImage.node.altText} width="430" height="436" layout="responsive" /></Link>
                                    <p className="xs-heading uppercase black">{post.categories.nodes[0].name}</p>
                                    <Link href={post.uri}><p className="heading left">{post.title}</p>
                                    </Link>
                                </ExploreMorePostsTile>
                            )
                        })
                    }
                </ExploreMorePostsGrid>
            </ExploreMorePostsInnerContainer>
        </ExploreMorePostsMainContainer>
    )
}