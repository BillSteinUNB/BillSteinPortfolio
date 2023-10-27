def test_a(val):
    if val > 0:
        return val * -1
    return val

def test_b(val_1, val_2):
    val_1_hold = val_1
    val_2_hold = test_a(val_2)
    while val_2_hold < 0:
        val_2_hold = val_2_hold + 1
        val_1_hold = val_1_hold + val_2
    return val_1_hold
    
print(test_b(3,4))
print(test_b(-3,3))
print(test_b(-8,-5))
