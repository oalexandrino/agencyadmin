export class ArrayList {
    static combine(a, b) {
        const result = [];

        a.filter(x => {
            return b.filter(x2 => {
                if (x2.payload.doc.id === x.payload.doc.id) {
                    result.push(x2);
                }
            });
        });
        return result;
    }
}