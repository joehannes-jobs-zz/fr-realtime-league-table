describe('scores league table', () => {
	beforeEach(function() {
		browser.get('http://localhost/scores');
	});

	it('should have a table', () => {
		var table = element.all(by.css('table'));
		expect(table.count()).toEqual(1);
	});

	it('should contain 20 items in the table', () => {
		var teams = element.all(by.css('table td'));
		expect(teams.count()).toEqual(20);
	});
});
