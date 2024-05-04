
export type LoadingProps = {
    error?: boolean
    pastDelay?: boolean
}

export default function Loading(props: LoadingProps) {
    if (props.error) {
        return <div>Error! <button onClick={() => window.location.reload()}>Retry</button></div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return <div></div>;
    }
} 