import Image from 'next/image';
import classes from './hero.module.css';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src={'/images/site/foto.png'}
                    alt={'Image showing Aleksey'}
                    width={300}
                    height={300}

                />
            </div>
            <h1>Hi, I'm Alex</h1>
            <p>This is my testing next js project</p>
        </section>
    );
};

export default Hero;
