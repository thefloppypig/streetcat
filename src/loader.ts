import { FeederList } from './shared/Types';

export async function loaderFeederList(): Promise<FeederList> {
    return (await import('../src/feeders/feederList.json')).default
}