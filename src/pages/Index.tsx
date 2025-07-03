import { useState } from "react";
import StoreRegistration from "@/components/StoreRegistration";
import StoreDashboard from "@/components/StoreDashboard";
import MainApp from "@/components/MainApp";
import { User, UserRole } from "@/types/user";
import { useStores } from "@/hooks/useStores";

const Index = () => {
	// 항상 게스트로 시작
	const [currentUser, setCurrentUser] = useState<User>({
		id: "guest",
		role: "guest",
		name: "Guest",
	});
	const [showStoreRegistration, setShowStoreRegistration] = useState(false);
	const { addStore, addNotification } = useStores();

	// 사장님 입장 버튼 등에서 호출
	const handleStoreRegistrationStart = () => {
		setShowStoreRegistration(true);
	};

	const handleStoreRegistration = (data: any) => {
		const storeUser: User = {
			id: Date.now().toString(),
			role: "store",
			name: data.name,
		};
		addStore(data, storeUser.id);
		setCurrentUser(storeUser);
		setShowStoreRegistration(false);
	};

	const handleLogout = () => {
		setCurrentUser({ id: "guest", role: "guest", name: "Guest" });
		setShowStoreRegistration(false);
	};

	const handleRoleChange = (role: UserRole) => {
		if (role === "store") {
			setShowStoreRegistration(true);
			return;
		}
		setCurrentUser({
			id: Date.now().toString(),
			role,
			name: role === "guest" ? "Guest" : "User",
		});
	};

	// 가게 등록 화면
	if (showStoreRegistration) {
		return <StoreRegistration onComplete={handleStoreRegistration} onBack={() => setShowStoreRegistration(false)} />;
	}

	// 사장님 로그인 시 대시보드
	if (currentUser.role === "store") {
		return <StoreDashboard userId={currentUser.id} onLogout={handleLogout} />;
	}

	// 일반 회원/게스트는 MainApp
	return <MainApp userRole={currentUser.role} onLogout={handleLogout} onRoleChange={handleRoleChange} onStoreRegistrationStart={handleStoreRegistrationStart} />;
};

export default Index;
