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
  }
`;

const Article: Template = ({ pageContext, location }) => {
 
  const contentSectionRef = useRef<HTMLElement>(null);

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const results = useStaticQuery(siteQuery);
  const name = results.strapiSiteMetadata.name;
 
  const { article, authors, next } = pageContext;

  const trackUrl = 'https://anchor.fm/s/451f4768/podcast/play/25102821/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-0-20%2F83fc4d6a-7e83-b48d-9046-33d41aef1c41.mp3';
  const trackImage = "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode/11496778/11496778-1610962795364-cc512b44a096a.jpg"
  const trackTitle = 'Katrin Wow';
  const trackName = 'Labba Labba Podcast - Episode 4';

  let podcastFrame;
  if (article.podcastProvider.provider == "spotify") {
    podcastFrame = <iframe src={article.podcastProvider.url} width="100%" height="232" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>;
  } else if (article.podcastProvider.provider == "anchor") {
    podcastFrame = <iframe src={article.podcastProvider.url} width="100%" frameBorder="0" scrolling="no"></iframe>;
  } else {
    podcastFrame = <AudioPlayer streamUrl={trackUrl} trackTitle={trackTitle} trackName={trackName} bgImage={trackImage}/>
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
          // If the image hasn't finished loading then add a listener
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
            {podcastFrame}
          </AudioBody>
          
    
        </MDXRenderer>
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
