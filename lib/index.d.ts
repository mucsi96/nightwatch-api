import NightwatchSection from 'nightwatch/lib/page-object/section';
export { startWebDriver, stopWebDriver, closeSession } from './client';
export declare function createSession(env: string): Promise<void>;
export declare function client(): {};
export declare class Section extends NightwatchSection {
    constructor(definition: any, options: any);
}
