import Image from 'next/image';

export default function Header() {
    return (
        <div className="w-full h-[200px] bg-[#0D0D0D] flex items-center justify-center relative">
        <h1 className="text-4xl font-bold flex items-center">
          <div className="relative" style={{ marginRight: '8px' }}>
            <Image src="/rocket.svg" width={24} height={24} alt="Rocket" style={{ position: 'relative', top: '1px' }} />
          </div>
          <span style={{ color: '#4EA8DE', fontWeight: 900 }}>Todo</span> <span style={{ color: '#5E60CE', marginLeft: '8px', fontWeight: 900 }}>App</span>
        </h1>
      </div>
    );
}