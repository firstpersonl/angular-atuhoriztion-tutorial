import { Observable, of, Subject } from "rxjs";
import { shareReplay, switchMap } from "rxjs/operators";

export interface IHttpCacheStorage {
    setItem(key: string, value: Observable<any>): void;
    getItem(key: string): Observable<any>;
}

export interface IHttpCacheOptions {
    storage: IHttpCacheStorage;
    refreshSubject: Observable<unknown> | Subject<unknown>;
}

type HttpRequestCacheMethod = (...args: any[]) => Observable<any>;

export function HttpRequestCache<T extends Record<string, any>>(
    optionHander: () => IHttpCacheOptions) {
    return (
            target: T,
            methodName: string,
            descriptor: TypedPropertyDescriptor<HttpRequestCacheMethod>
    ): TypedPropertyDescriptor<HttpRequestCacheMethod> => {

        if (!(descriptor?.value instanceof Function)) {
            throw new Error("@HttpRequestCache can be appliey only class method.");
        }

        const cacheKeyPrefix = `${target.constructor.name}_${methodName}`;
        const originMethod = descriptor.value;

        descriptor.value = function (...args: any[]): Observable<any> {
            // options.call(this) this is use descriptor method class 'this'
            const { storage, refreshSubject } = optionHander.call(this);
            const key = `${cacheKeyPrefix}_${JSON.stringify(args)}`;
            let observable = storage.getItem(key);
            if (observable) {
                return observable;
            }

            observable = of(originMethod.apply(this, args),
                refreshSubject.pipe(
                    switchMap(() => originMethod.apply(this, args))
                ).pipe(margeAll(), shareReplay(1))
            );

            return observable;

        }

        return descriptor;
    }
}

function margeAll(): import("rxjs").OperatorFunction<any, unknown> {
    throw new Error("Function not implemented.");
}
