import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';

const BlogGridContainer = styled.section`
    display: grid;
    grid-template-columns: 10% 1fr 1fr 1fr 10%;
    grid-row-gap: 3rem;
    grid-column-gap: 1rem;
    grid-auto-flow: dense;
    margin-bottom: 6rem;
`
const BlogTile = styled.div`
    display: flex;
    flex-direction: column;

    grid-column: span 1;

    grid-column-start: 2;


    /* grid-column-end: 5; */

    &:nth-child(1n) {
        grid-column: 2 / 3;
    }

    &:nth-of-type(2n) {
        grid-column: 3 / 4;
    }

    &:nth-child(3n) {
        grid-column: 4 / 5;
    }

    ${props => props.featured && css`
        grid-column: 1 / 6 !important;
        display: flex;
        flex-direction: column;
        min-height: 60vh;

        background-image: url(${props.background}) !important;
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;

        padding-inline: 10%;

        img, span { display: none !important; }

        p { color: #fff; }
    `}

    
`

export default function BlogGrid(props) {



    const { posts } = props;

    return (
        <BlogGridContainer>
            {
                posts && posts.map((post, index) => {
                    
                    const featured = post.blogPost.featured === null ?
                        false :
                        post.blogPost.featured;
                    
                    const category = post.categories.nodes[0].name;

                    return (
                        <BlogTile key={index} featured={featured} background={post.featuredImage.node.mediaItemUrl}>
                            { featured && ( <p>Featured Story</p> ) }
                            <Image src={post.featuredImage.node.mediaItemUrl} width={430} height={436} layout="responsive" />
                            { !featured && ( <p>{category}</p> ) }
                            <Link href={post.link}>
                                <p>{post.title}</p>
                            </Link>
                        </BlogTile>
                    )
                })
            }
        </BlogGridContainer>
    )
}