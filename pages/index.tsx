import SEO from '../components/SEO';
import Landing from '../components/Landing';
import GET_LANDING_PAGE_PROPS from '../apollo/queries/getLandingPageProps';
import client from '../apollo/client';
import LandingPageProps from '../types/LandingPageProps';
import React from 'react';
import About from '../components/About';

export default function Home(props: LandingPageProps) {
	return (
		<>
			<SEO />
			<Landing name={props.name} roles={props.roles} links={props.links} />
			<About about={props.about} image={props.image} />
		</>
	);
}

export async function getStaticProps() {
	const { data } = await client.query({
		query: GET_LANDING_PAGE_PROPS,
		variables: { id: process.env.USER_ID },
	});

	return {
		props: {
			name: data.landingPage.name,
			roles: data.landingPage.roles,
			links: data.landingPage.socialLink.links,
			about: data.landingPage.about.markdown,
			image: data.landingPage.image.url,
		},
	};
}
