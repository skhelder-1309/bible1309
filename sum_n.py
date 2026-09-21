def sum_formula(n: int) -> int:
    """공식 n * (n + 1) // 2 를 이용한 계산 (O(1))"""
    return n * (n + 1) // 2


def sum_loop(n: int) -> int:
    """반복문(for)을 이용한 계산 (O(n))"""
    total = 0
    for i in range(1, n + 1):
        total += i
    return total


def main():
    print("=== 1부터 n까지의 합 구하기 ===")
    try:
        n_str = input("자연수 n을 입력하세요: ").strip()
        n = int(n_str)
        if n < 1:
            print("오류: 1 이상의 자연수를 입력해주세요.")
            return

        result_formula = sum_formula(n)
        result_loop = sum_loop(n)

        print(f"\n[결과]")
        print(f"1부터 {n}까지의 합 (공식 이용): {result_formula}")
        print(f"1부터 {n}까지의 합 (반복문 이용): {result_loop}")

    except ValueError:
        print("오류: 올바른 정수를 입력해주세요.")


if __name__ == "__main__":
    main()
