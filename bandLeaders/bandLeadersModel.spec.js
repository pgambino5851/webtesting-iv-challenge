const db = require('../data/dbConfig');
const bLeader = require('./bandLeadersModel')

describe('bandleaders model', () => {
    describe('insert()', () => {

        beforeEach(async () => {
            await db('bandleaders').truncate();
        })

    it('should insert a bandleaders into the db', async () => {
        await bLeader.insert({ name: 'Artie Shaw' });

        let bandleaders = await db('bandleaders');

        expect(bandleaders).toHaveLength(1);

        await bLeader.insert({ name: 'Duke Ellington' });

        bandleaders = await db('bandleaders');

        expect(bandleaders).toHaveLength(2);
        })

    it('should insert the provided bandleader into the db', async () => {
        let bandleader = await bLeader.insert({ name: 'Billie Holiday' });
        expect(bandleader.name).toBe('Billie Holiday');
        })
    })

    describe('remove()', () => {

        beforeEach(async () => {
            await db('bandleaders').truncate();
        })

        it('should remove a bandleader', async () => {

            await bLeader.insert({name: "Ella Fitzgerald"})

            const bandleaders = await db('bandleaders');

            expect(bandleaders).toHaveLength(1);

            const id = bandleaders[0].id;

            await bLeader.remove(id);

            const deletedBLeaders = await db('bandleaders');
            expect(deletedBLeaders).toHaveLength(0);
        })

        it('should only remove the targeted bandleader', async () => {
            await bLeader.insert({name: "Ella Fitzgerald"})
            await bLeader.insert({name: "Artie Shaw"})

            let bandleaders = await db('bandleaders');
            console.log("Bandleaders", bandleaders)

            expect(bandleaders).toHaveLength(2);

            const id = bandleaders[0].id;

            await bLeader.remove(id);

            bandleaders = await db('bandleaders');
            expect(bandleaders).toHaveLength(1);
            expect(bandleaders[0].name).toBe("Artie Shaw")
        })
    })
})