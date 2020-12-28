import React from "react"
import { Link } from "gatsby"
import styled from '@emotion/styled';

import Section from "@components/Section";
import Layout from "@components/Layout";
import mediaqueries from '@styles/media';

const NotFound = () => {
  return (
    <Layout>
      <Section narrow>
      <HeadingContainer style={{ maxWidth: `650px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: "Page not found"}} />
        <SocialIconContainer>
          <Link to="/">Head home</Link>
      </SocialIconContainer>
      </HeadingContainer>
      </Section>
    </Layout>
  )
}

export default NotFound


const HeadingContainer = styled.div`
  margin: 100px 0;

  ${mediaqueries.desktop`
    width: 80%;
  `}

  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 52px;
  line-height: 1.15;
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 38px
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;



const SocialIconContainer = styled.div`

  margin: 25px 0;

  a { 
    position: relative;
    margin: 25px 0;
    text-decoration: none;
    max-width: 16px;
    color: ${p => p.theme.colors.accent};
    &:hover {
      background: ${p => p.theme.colors.hover};
    }  
  }




`;
