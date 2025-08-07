'use client'
import React from 'react'
import { MessageSquare, Bell, CircleQuestionMark, CircleUserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
function Header() {

    const router = useRouter()

    interface HandleClick {
        (title: string): React.MouseEventHandler<HTMLDivElement>;
    }

    const handleClick: HandleClick = (title) => (event) => {
        router.push(`/?tab=${encodeURIComponent(title)}`)
    }

    return (
        <div className='text-amber-50 flex flex-row justify-end gap-10 mt-3 mr-3 '>
            <div onClick={handleClick("Messages")}><MessageSquare /></div>
            <div><Bell /></div>
            <div onClick={handleClick("Support")}><CircleQuestionMark /></div>
            <div onClick={handleClick("My Profile")}><CircleUserRound /></div>
        </div>
    )
}

export default Header