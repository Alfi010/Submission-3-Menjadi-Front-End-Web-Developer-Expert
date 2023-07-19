const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurants', ({ I }) => {
    I.seeElement('#query');
    I.see('Tidak ada Restaurant yang dapat ditampilkan!', '.resto-not-found');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.see('Tidak ada Restaurant yang dapat ditampilkan!', '.resto-not-found');

    I.amOnPage('/');


    I.seeElement('.resto__title');

    const firstResto = locate('.resto__title').first();
    const firstRestoName = await I.grabTextFrom('.resto__name');
    I.click(firstResto);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.resto_item');
    const likedRestoName = await I.grabTextFrom('.resto__name');

    assert.strictEqual(firstRestoName, likedRestoName);
});

Scenario('cancel liking a restaurant', async ({ I }) => {
    I.amOnPage('/');

    I.waitForElement('.resto__title', 10);

    I.seeElement('.resto__title');

    const firstResto = locate('.resto__title').first();
    const firstRestoName = await I.grabTextFrom('.resto__name');
    I.click(firstResto);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.resto_item');
    const likedRestoName = await I.grabTextFrom('.resto__name');

    assert.strictEqual(firstRestoName, likedRestoName);

    I.click(firstResto);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.see('Tidak ada Restaurant yang dapat ditampilkan!', '.resto-not-found');
});

Scenario('searching restaurants', async ({ I }) => {
    I.see('Tidak ada Restaurant yang dapat ditampilkan!', '.resto-not-found');

    I.amOnPage('/');

    I.seeElement('.resto__title');

    const names = [];

    for (let i = 1; i <= 3; i++) {
        I.click(locate('.resto__title').at(i));
        I.seeElement('#likeButton');
        I.click('#likeButton');
        names.push(await I.grabTextFrom('.resto__name'));
        I.amOnPage('/');
    }

    I.amOnPage('/#/favorite');
    I.waitForElement('#query', 10);
    I.seeElement('#query');

    const searchQuery = names[1].substring(1, 3);
    const matchingResto = names.filter((name) => name.indexOf(searchQuery) !== -1);

    I.fillField('#query', searchQuery);
    I.pressKey('Enter');

    await I.waitForElement('.resto__name', 10);

    const visibleLikedResto = await I.grabNumberOfVisibleElements('.resto_item');
    assert.strictEqual(matchingResto.length, visibleLikedResto);

    matchingResto.forEach(async (name, index) => {
        await I.waitForElement(locate('.resto__name').at(index + 1), 10);
        const visibleName = await I.grabTextFrom(locate('.resto__name').at(index + 1));
        assert.strictEqual(name, visibleName);
    });
});
