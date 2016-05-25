import {
	getArtistTracks,
	getBest
} from '../spotify.js'

describe('spotify', ()=>{
	it('gets artists', ()=> {
		var fetchSpy = jasmine.createSpy('spy');
		window.fetch = fetchSpy;
		fetch.and.returnValue(Promise.resolve({}))
		getBest();
		expect(fetch).toHaveBeenCalled();
	});
});