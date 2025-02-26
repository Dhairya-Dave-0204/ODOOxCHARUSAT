import React from 'react'
import { AboutShort, DocCourousal, FeatureCard, Header, ListPracticeBanner, SurveyBanner, Testimonial } from '../../components/component_index'

function Home() {
  return (
    <>
      <Header />
      <FeatureCard />
      <DocCourousal />
      <Testimonial />
      <AboutShort />
      <ListPracticeBanner padding={60}/>
      <SurveyBanner />
    </>
  )
}

export default Home