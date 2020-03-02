export default class Emitter {
    constructor() {
        this.emap = new Map();
    }
    on(name, fn) {
        if (!fn || typeof fn !== 'function') {
            throw new Error('fn error');
        }
        if (!this.emap.has(name)) {
            this.emap.set(name, []);
        }
        this.emap.get(name).push(fn);
    }
    emit(name, ...args) {
        this.emap.has(name) && this.emap.get(name).forEach(fn => fn.apply(this, args));
    }
    off(name, removefn) {
        if (!this.emap.has(name)) {
            return;
        }
        if (!removefn) {
            this.emap.delete(name);
            return;
        }
        const newfnlist = this.emap.get(name).filter(fn => fn !== removefn);
        if (newfnlist.length === 0) {
            this.emap.delete(name);
            return;
        }
        this.emap.set(
            name,
            newfnlist,
        );
    }
    once(name, fn) {
        if (!fn || typeof fn !== 'function') {
            throw new Error('fn error');
        }
        const fnwrap = (...args) => {
            this.off(name, fnwrap);
            fn.apply(this, args);
        }

        this.on(name, fnwrap);
    }
}