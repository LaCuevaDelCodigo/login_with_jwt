import { Button, Center, Flex, Space, TextInput } from "@mantine/core"
import { FC, useRef, useState } from "react"
import { decodeToken } from "react-jwt";

interface UserData {
    id: string
    name: string
}

export const HomePage: FC<{}> = () => {
    const inputName = useRef('')

    const [token, setToken] = useState('')
    const [userData, setUserData] = useState<UserData | null>(null)
    const [privateData, setPrivateData] = useState('')

    async function login() {
        setPrivateData('')
        const response = await fetch(`http://localhost:8080/login?name=${inputName.current}`)
        const { token: tokenResponse } = await response.json()

        setToken(tokenResponse)

        const userDataFromToken = getUserDataFromToken(tokenResponse)
        setUserData(userDataFromToken)
    }

    function logout() {
        inputName.current = ''
        setToken('')
        setUserData(null)
        setPrivateData('')
    }

    async function callPrivateEndpoint() {
        const response = await fetch(`http://localhost:8080/private`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const { data } = await response.json()

        setPrivateData(data)
    }

    if (!token) {
        return (
            <Center mt={50}>
                <Flex direction="column">
                    <TextInput
                        onChange={(e) => inputName.current = e.currentTarget.value}
                        label='Nombre'
                        placeholder="ejemplo: LaCueva"
                    />
                    <Space h={50} />

                    <Button onClick={login}>Login</Button>
                    <Space h={50} />

                    <Button onClick={callPrivateEndpoint}>Call private endpoint</Button>
                    <Space h={10} />
                    {privateData && <div>private data: {privateData}</div>}
                </Flex>
            </Center>
        )
    }

    return (
        <Center mt={50}>
            <Flex direction="column">
                <div>Logueado con el token:</div>
                <Space h={10} />
                <div style={{ inlineSize: '300px', overflowWrap: 'break-word' }}>{token}</div>
                <Space h={30} />

                <div>id: {userData?.id}</div>
                <Space h={10} />
                <div>name: {userData?.name}</div>
                <Space h={30} />

                <Button onClick={logout}>Logout</Button>
                <Space h={50} />

                <Button onClick={callPrivateEndpoint}>Call private endpoint</Button>
                <Space h={10} />
                {privateData && <div><strong>private data</strong>: {privateData}</div>}
            </Flex>
        </Center>
    )
}

function getUserDataFromToken(token: string): UserData {
    const payload = decodeToken(token) as UserData | null;

    if (!payload) {
        throw new Error();
    }

    return payload
}