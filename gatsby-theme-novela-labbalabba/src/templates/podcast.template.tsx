import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "@components/Layout";
import MDXRenderer from "@components/MDX";
import Progress from "@components/Progress";
import Section from "@components/Section";
import AudioPlayer from "@components/AudioPlayer"

import mediaqueries from "@styles/media";
import { debounce } from "@utils";

import SocialLinks from "@components/SocialLinks";

import ArticleAside from "../sections/article/Article.Aside";
import ArticleHero from "../sections/article/Article.Hero";
import ArticleControls from "../sections/article/Article.Controls";
import ArticlesNext from "../sections/article/Article.Next";
import ArticleSEO from "../sections/article/Article.SEO";
import ArticleShare from "../sections/article/Article.Share";
import ArticleFooter from './article.footer.template';

import { Template } from "@types";

const siteQuery = graphql`
  {
    strapiSiteMetadata {
      name
    }
    strapiWataboiAcknowledgment {
      childMdBody {
        childMdx {
          body
        }
      }
    }
  }
`;

const Article: Template = ({ pageContext, location }) => {
 
  const contentSectionRef = useRef<HTMLElement>(null);

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const results = useStaticQuery(siteQuery);
  const name = results.strapiSiteMetadata.name;
 
  const acknowledgmentBody = results.strapiWataboiAcknowledgment.childMdBody.childMdx.body;

  const { article, authors, next } = pageContext;

  const podcastGuest = article.guests.reduce((curr, next, index, array) => {
    if (array.length === 1) {
      return next.name;
    }

    return `${curr + next.name}, `;
  }, ``);

  const podcastName = `${name} Podcast - Episode ${article.episodeNum}`;

  let audioFrame;
  if (article.podcastProvider.provider == "spotify") {
    audioFrame = <iframe src={article.podcastProvider.url} width="100%" height="232" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>;
  } else if (article.podcastProvider.provider == "anchor") {
    audioFrame = <iframe src={article.podcastProvider.url} width="100%" frameBorder="0" scrolling="no"></iframe>;
  } else {
    audioFrame = <AudioPlayer streamUrl={article.podcastProvider.url} podcastGuest={podcastGuest} podcastName={podcastName} podcastImage={article.podcastImg} bgColor={article.podcastPlayerColor}/>
  }

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current;

      if (!contentSection) return;

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize);
        const $imgs = contentSection.querySelectorAll("img");

        $imgs.forEach($img => {
          // If t he image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation;
        });

        // Prevent rerun of the listener attachment
        setHasCalculated(true);
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height);
    }, 20);

    calculateBodySize();
    window.addEventListener("resize", calculateBodySize);

    return () => window.removeEventListener("resize", calculateBodySize);
  }, []);

  return (
    <Layout>
      <ArticleSEO article={article} authors={authors} location={location} />
      <ArticleHero article={article} authors={authors} />
      <ArticleAside contentHeight={contentHeight}>
        <Progress contentHeight={contentHeight} />
      </ArticleAside>
      <MobileControls>
        <ArticleControls />
      </MobileControls>
      <ArticleBody ref={contentSectionRef}>
        <MDXRenderer content={article.body}>
          <ArticleShare />
          <AudioBody> 
            {audioFrame}
          </AudioBody>
          {article.podcastLinks.length  > 0  && (
          <LinkContainer>
            <SocialLinksSubject>Links to other podcast platforms:</SocialLinksSubject>
            <SocialLinks links={article.podcastLinks} big="true"/>            
          </LinkContainer>
          )}
        </MDXRenderer>
        <SideNote><MDXRenderer content={acknowledgmentBody} /></SideNote>
        
      </ArticleBody>
      <ArticleFooter pageContext={pageContext} />
      {next.length > 0 && (
        <NextArticle narrow>
          <FooterNext>More articles from {name}</FooterNext>
          <ArticlesNext articles={next} />
          <FooterSpacer />
        </NextArticle>
      )}
    </Layout>
  );
};

export default Article;

const SideNote = styled.p`  
  line-height: 2.5;  
  
  text-align: center;
  p {
  color: ${p => p.theme.colors.grey};
  font-size: 15px;
  }
`;

const SocialLinksSubject = styled.p`  
  line-height: 2.5;  
  font-size: 18px;
  padding-bottom: 1.5rem;
`;

const LinkContainer = styled.div`
  max-width: 800px;
  width: ${(910 / 1140) * 100}%;
  margin: auto;
  text-align: center;
  padding-bottom: 5rem;
  color: ${p => p.theme.colors.grey};

  a {
    margin: 3.5rem;
  }

  ${mediaqueries.phablet`
    a {
      margin: 1.5rem;
    }
  `}  
  `

const MobileControls = styled.div`
  position: relative;
  padding-top: 60px;
  transition: background 0.2s linear;
  text-align: center;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`;

const ArticleBody = styled.article`
  position: relative;
  padding: 160px 0 35px;
  padding-left: 68px;
  transition: background 0.2s linear;

  ${mediaqueries.desktop`
    padding-left: 53px;
  `}
  
  ${mediaqueries.tablet`
    padding: 70px 0 80px;
  `}

  ${mediaqueries.phablet`
    padding: 60px 0;
  `}
`;

const NextArticle = styled(Section)`
  display: block;
`;

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${p => p.theme.colors.grey};
    width: ${(910 / 1140) * 100}%;
    height: 1px;
    right: 0;
    top: 11px;

    ${mediaqueries.tablet`
      width: ${(600 / 1140) * 100}%;
    `}

    ${mediaqueries.phablet`
      width: ${(400 / 1140) * 100}%;
    `}

    ${mediaqueries.phone`
      width: 90px
    `}
  }
`;

const FooterSpacer = styled.div`
  margin-bottom: 65px;
`;

const AudioBody = styled.div`
  max-width: 800px;
  width: ${(910 / 1140) * 100}%;
  margin: 55px auto;
`;
