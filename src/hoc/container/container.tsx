import Header from '../../component/header/header'

interface Props {
    children: any;
    showHeader: boolean;
}

function Container({ children, showHeader }: Props) {

    return (
        <div className='wrapper'>
            {showHeader ? (
                <Header />
            ) : null}
            {children}
        </div>
    )
}

export default Container