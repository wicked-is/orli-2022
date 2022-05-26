import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';

const BlogGridContainer = styled.section`
    display: flex;
    align-items; flex-start;
    flex-wrap: wrap;
    margin-bottom: 6rem;
`
const BlogTile = styled.div`
    display: inline;


    /* grid-column-end: 5; */
    &:first-child,
    &:nth-child(1n + 3) {
        width: 28.33%;
        margin: 0.5rem 0.5rem 0.5rem 5rem;
    }

    &:nth-child(2),
    &:nth-child(2n) {
        width: 28.33%;
        margin: 0.5rem;
    }

    &:nth-child(3),
    &:nth-child(3n + 4) {
        width: 28.33%;
        margin: 0.5rem 5rem 0.5rem 0.5rem;
    }

    ${props => props.featured && css`
        display: block;
        min-height: 70vh;
        width: 100% !important;
        background-image: url(${props.background}) !important;
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        margin: 4rem 0 !important;
        padding: 4rem 6rem;

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
                            { featured && ( <p className="xs-heading uppercase white">Featured Story</p> ) }
                            <Image src={post.featuredImage.node.mediaItemUrl} width={430} height={436} layout="responsive" />
                            { !featured && ( <p className="xs-heading uppercase black">{category}</p> ) }
                            <Link href={post.link}>
                                <p className="serif heading black">{post.title}</p>
                            </Link>
                        </BlogTile>
                    )
                })
            }
        </BlogGridContainer>
    )
}