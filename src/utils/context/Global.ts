import { createContext } from 'react';

export interface GlobalContextState {
    name: string;
    surname: string;
    email: string;
    id: string;

    authenticated: boolean | null;
}

export type GlobalContextStateOptional = Partial<GlobalContextState>;

export interface GlobalContextStateInterface extends GlobalContextState {
    updateGlobalContext: (state: GlobalContextStateOptional) => void;
}

const initialContextState: GlobalContextState = {
    email: '',
    id: '',
    name: '',
    surname: '',
    authenticated: null,
};

const GlobalContext = createContext<GlobalContextStateInterface>({
    ...initialContextState,
    updateGlobalContext: () => {},
});

export { GlobalContext, initialContextState };
