import { illegalArity } from "@thi.ng/errors/illegal-arity";

import { IReducible, Reducer, Transducer } from "./api";
import { reduce } from "./reduce";
import { map } from "./xform/map";

export function transduce<A, B, C>(tx: Transducer<A, B>, rfn: Reducer<C, B>): Transducer<Iterable<A>, C>;
export function transduce<A, B, C>(tx: Transducer<A, B>, rfn: Reducer<C, B>, xs: Iterable<A>): C;
export function transduce<A, B, C>(tx: Transducer<A, B>, rfn: Reducer<C, B>, xs: IReducible<C, A>): C;
export function transduce<A, B, C>(tx: Transducer<A, B>, rfn: Reducer<C, B>, acc: C, xs: Iterable<A>): C;
export function transduce<A, B, C>(tx: Transducer<A, B>, rfn: Reducer<C, B>, acc: C, xs: IReducible<C, A>): C;
export function transduce(...args: any[]): any {
    let acc, xs;
    switch (args.length) {
        case 4:
            xs = args[3];
            acc = args[2];
            break;
        case 3:
            xs = args[2];
            break;
        case 2:
            return map((x: Iterable<any>) => transduce(args[0], args[1], x));
        default:
            illegalArity(args.length);
    }
    return reduce(args[0](args[1]), acc, xs);
}
