export enum AllTablesEnum {
	User = "User",
	ConfirmUser = "ConfirmUser",
	Profile = "Profile",
	Post = "Post",
	Comment = "Comment",
	Sessions = "Sessions",
	LikesInfoPost = "LikesInfoPost",
	LikesInfoComment = "LikesInfoComment"
}

export type UserBaseType = {
	id: string
	username: string
	email: string
	hushPass: string
	createdAt: Date
	gitHubInf: string
	googleInf: string
	isBanned: boolean
	banReason: string
	isPremium: boolean
	isDeleted: boolean
}

export type SessionsBaseType = {
	id: string
	ip: string
	title: string
	sessionExpired: string
	createdAt: Date
	userOwnerId: string
}
