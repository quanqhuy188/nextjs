'use client'
import { useRouter } from "next/navigation";


const Facebook = () => {
    const router = useRouter()

    const handleBtn = () => {
        router.push("/")
    }
    
    return (
        <>
            Hello Facebook
            <button onClick={handleBtn}>Back home</button>
        </>
    );
}

export default Facebook;